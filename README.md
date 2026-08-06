# JWAYU — Variational Distributional Language Models

Official bilingual website for **JWAYU**, a startup developing variational distributional language models powered by **EVE — Elemental Variational Expanse**.

## Included

- English site at `/`
- French site at `/fr/`
- Simplified Chinese site at `/zh/`
- Spanish site at `/es/`
- Italian site at `/it/`
- German site at `/de/`
- Simplified Chinese one-page site at `/zh/`
- Responsive navigation and smooth section-based exploration
- Animated latent-space background, with reduced-motion support
- Technical explanation of the variational distributional neuron
- Variational language-model research roadmap
- Four linked arXiv publications
- Investor and research contact calls to action
- SEO metadata, structured data, sitemap, robots file and bilingual `hreflang`
- `CNAME` configured for `jwayu.com`
- No framework, package manager or paid hosting required

## Publish on GitHub Pages

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for the complete GitHub Pages and DNS procedure.

The fastest path is:

1. Create a public GitHub repository.
2. Upload every file and folder from this package to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, then `main` and `/ (root)`.
5. Set the custom domain to `jwayu.com`.
6. Configure the domain DNS records listed in `DEPLOYMENT.md`.
7. Enable **Enforce HTTPS** when GitHub makes the option available.

## Local preview

From this directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Main content files

- `index.html` — English page
- `zh/index.html` — Chinese page
- `assets/css/styles.css` — visual design and responsive layout
- `assets/js/main.js` — navigation, scroll state, reveal effects and latent-space animation
- `assets/img/logo-jwayu.png` — supplied JWAYU logo

## Editing the contacts

The current contact address is `yves@ruffenach.net`. Search for that address in both HTML pages to replace it later or to separate investor and general enquiries.

## Research links

- Variational Distributional Neuron — arXiv:2602.18250
- Exploring the Dimensions of a Variational Neuron — arXiv:2603.13849
- Variational Neurons in Transformers for Language Modeling — arXiv:2603.28219
- Agentic Control in Variational Language Models — arXiv:2604.12513

## License

The website code is supplied under the MIT License. The JWAYU name, logo and research materials remain the property of their respective owner.
