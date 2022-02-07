import Route from '@ioc:Adonis/Core/Route'

Route.get('/sitemap', async ({ view }) => {
  return view.render('pages/sitemap')
}).as('sitemap')

Route.get('/contact-us', async ({ view }) => {
  return view.render('pages/contact-us')
}).as('contact-us')
