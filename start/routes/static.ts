import Route from '@ioc:Adonis/Core/Route'
import Markdown from 'App/Services/Markdown'
import fs from 'fs/promises'

Route.get('/sitemap', async ({ view }) => {
  return view.render('pages/sitemap')
}).as('sitemap')

Route.get('/contact-us', async ({ view }) => {
  return view.render('pages/contact-us')
}).as('contact-us')

Route.get('/terms', async ({ view }) => {
  const file = await fs.readFile('./content/terms.md', 'utf-8')
  const html = await Markdown.render(view.renderRawSync(file))

  return view.render('templates/terms', { html })
}).as('terms')

Route.get('/privacy', async ({ view }) => {
  const file = await fs.readFile('./content/privacy.md', 'utf-8')
  const html = await Markdown.render(view.renderRawSync(file))

  return view.render('templates/privacy', { html })
}).as('privacy')

Route.get('/about', async ({ view }) => {
  const file = await fs.readFile('./content/about.md', 'utf-8')
  const html = await Markdown.render(view.renderRawSync(file))

  return view.render('templates/about', { html })
}).as('about')
