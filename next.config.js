module.exports = {
  reactStrictMode: true,    // Habilitar o modo estrito do React para ajudar a identificar problemas.
  swcMinify: true,          // Ativa a minificação usando o SWC para otimização.
  env: {
    NEXTCLOUD_WEBDAV_URL: process.env.NEXTCLOUD_WEBDAV_URL, // Variáveis de ambiente para acesso ao NextCloud
    NEXTCLOUD_USER: process.env.NEXTCLOUD_USER,             // Usuário do NextCloud
    NEXTCLOUD_PASSWORD: process.env.NEXTCLOUD_PASSWORD      // Senha do NextCloud
  },
  async redirects() {
    return [
      {
        source: '/old-url',
        destination: '/new-url',
        permanent: true,
      },
    ]
  },
}
