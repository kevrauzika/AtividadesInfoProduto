# Hora da Atividade

Landing page estática em português, usando as capas, as páginas de exemplo e o ursinho originais dos PDFs em `../Modulos`. As fontes Sniglet e Andika e a paleta seguem o material.

## Visualizar

Na pasta `landing-page`, execute `python -m http.server 4173 --directory dist` e abra `http://localhost:4173`.

## Checkout

Todos os links de compra levam a `https://pay.kiwify.com.br/cr5Dx5u`, inclusive os do cabeçalho, destaque inicial, oferta, final da página e barra mobile. São links nativos que funcionam também sem JavaScript. Para trocar o checkout, atualize `checkoutUrl` em `dist/config.js` e os links de compra em `dist/index.html`.

O checkout deve oferecer o pack completo por R$ 19,90 e disponibilizar os PDFs completos após a confirmação do pagamento. Os PDFs presentes nesta pasta de referência contêm somente capas e amostras; não são o pacote completo.

## Conteúdo

9 módulos e 353 páginas, conforme as informações fornecidas. A página apresenta os níveis 1 (4 a 6 anos), 2 (6 a 8 anos) e 3 (8 a 10 anos), amostras ampliáveis, orientações para pais e professores, perguntas frequentes e botões de compra também no celular.

As imagens públicas incluem somente capas e exemplos. Os arquivos completos do produto devem ser entregues pela plataforma de venda.
