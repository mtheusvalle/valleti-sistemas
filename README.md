# ValleTI Sistemas

Site estático de apresentação e validação da procura por sistemas e automações para pequenos negócios de Castelo e região, ES.

Domínio publicado: `https://valleti.com.br`.

## Configurar antes de publicar

Edite `site-config.js`:

- `whatsappNumber`: número com código do país e DDD, somente dígitos (ex.: `5527999999999`). Sem número, os CTAs ficam desativados e informam que o WhatsApp está em configuração.
- `gaMeasurementId`: ID do fluxo Web do GA4 (`G-...`). O script do Analytics só é carregado após consentimento; a escolha fica salva no navegador.
- `searchConsoleVerification`: valor fornecido pelo Search Console para o método de verificação HTML. Se o método escolhido exigir uma tag estática no HTML, copie o valor para uma tag `google-site-verification` no `<head>` de `index.html`; também é possível verificar por DNS.
- `siteUrl`: origem pública HTTPS do site, sem caminho, por exemplo `https://seu-dominio.com.br`. Ela alimenta a URL canônica.

Não publique sem substituir o número e o domínio. Não use endereço físico ou dados comerciais que não representem a operação real.

## Prévia local

Com Node.js instalado, sirva a pasta por HTTP para testar a página e os arquivos estáticos:

```sh
python -m http.server 8000
```

Abra `http://localhost:8000`. Uma prévia por `file://` não é recomendada porque recursos e medições podem se comportar de forma diferente.

## Publicação e medição

1. Configure o domínio e o WhatsApp em `site-config.js`; configure o GA4 se for medir tráfego.
2. Gere o sitemap e a diretiva `Sitemap` do `robots.txt` a partir da origem real:

   ```sh
   SITE_URL=https://seu-dominio.com.br node scripts/generate-sitemap.mjs
   ```

   No PowerShell: `$env:SITE_URL = "https://seu-dominio.com.br"; node scripts/generate-sitemap.mjs`.
3. Publique os arquivos na raiz do domínio HTTPS. Verifique o domínio no Search Console, envie `/sitemap.xml` e acompanhe indexação, impressões, cliques e consultas.
4. No GA4, acompanhe `whatsapp_click` e o parâmetro `cta_placement`. O evento representa clique no link; não confirma que a conversa foi iniciada ou que virou oportunidade.
5. Teste em celular e desktop. No navegador, confirme que os links abrem o WhatsApp com mensagem preenchida, que o consentimento é respeitado e que os eventos só são enviados após aceite.

O Google pode levar tempo para rastrear e indexar páginas. O site não promete posicionamento ou volume de contatos.
