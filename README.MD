***`Not:`*** Bu proje `IIS` üzerinde ayağa kaldırılacak ise ***routing***'de problem yaşamamak için bu projenin ana dizinindeki `web.config` dosyasını projenin **build** dosyaları ile birlikte yayınlayınız. *(Bu işlem yapılmadığında sayfanın manuel olarak yenilenmesi halinde sayfaya erişim sağlanamamaktadır.)*

# Environment Variables

Aşağıdaki environment değişkenler environment ortamınıza göre `.env.development`, `.env.production` ve `.env.staging` veya environment ortamınızın ismine göre dosya oluşturup bu dosyalara yazılmaktadır.

- `ENV`: 'Development|Staging|Production veya ortamın ismini belirten herhangi bir string değer girilebilir.'
- `VUE_APP_BASE_API`: '***Web API***'nin base url'sidir. Örneğin; `http://localhost:5025/api/` url'sinde olduğu gibi `/api/` relative url'si de her yerde tekrar tekrar yazılmamak için base url'nin sonuna eklenebilir'
