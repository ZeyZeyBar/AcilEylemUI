<template>
  <div>
    <div v-if="searchBarVisible">
      <div>
        <label>
          <gmap-autocomplete @place_changed="initMarker" />
          <button @click="addLocationMarker">Ekle</button>
        </label>
        <br>
      </div>
      <br>
    </div>
    <gmap-map
      :zoom="zoom"
      :center="center"
      style="width:100%; height: 900px;"
    >
      <gmap-marker
        v-for="(m, index) in locationMarkers"
        :key="index"
        :position="m.position"
        @click="toggleInfoWindow(m, index)"
      />
      <gmap-info-window
        v-if="locationMarkers.length > 0"
        :options="infoOptions"
        :position="center"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <slot :current-location-marker="locationMarkers[currentMidx]" />
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: {
    searchBarVisible: {
      type: Boolean,
      default: true
    },
    zoom: {
      type: Number,
      default: 14
    },
    locationMarkers: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      center: {
        lat: 41.070941,
        lng: 28.9425072
      },
      locPlaces: [],
      existingPlace: null,
      infoWinOpen: false,
      currentMidx: 0,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  mounted() {
    // this.locateGeoLocation()
    if (this.locationMarkers.length > 0) {
      this.center = this.locationMarkers[
        this.locationMarkers.length - 1
      ].position
    }
  },
  methods: {
    initMarker(loc) {
      this.existingPlace = loc
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        }
        this.locationMarkers.push({ position: marker })
        this.locPlaces.push(this.existingPlace)
        this.center = marker
        this.existingPlace = null
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      })
    },
    toggleInfoWindow: function(marker, idx) {
      this.center = marker.position
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  }
}
</script>

<style>

  .gm-style .gm-style-iw-d {
    overflow: hidden !important;
  }

</style>
