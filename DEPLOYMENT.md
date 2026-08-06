# Deploy JWAYU on GitHub Pages with `jwayu.com`

This site is completely static. It can be hosted free of charge in a public repository with GitHub Pages.

## 1. Create the repository

Create a public repository, for example:

- `jwayu-site`, or
- `jwayu.github.io` when the GitHub account or organization itself is named `jwayu`.

Upload the full contents of this package to the repository root. Do not upload the enclosing ZIP file as the only file: GitHub Pages needs to see `index.html` at the root.

### Optional command-line method

```bash
git init
git add .
git commit -m "Launch JWAYU website"
git branch -M main
git remote add origin https://github.com/<GITHUB-ACCOUNT>/<REPOSITORY>.git
git push -u origin main
```

## 2. Enable GitHub Pages

In the repository:

1. Open **Settings**.
2. In the left sidebar, open **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`.
5. Save.

The default address will be one of these forms:

- `https://<GITHUB-ACCOUNT>.github.io/` for an account site, or
- `https://<GITHUB-ACCOUNT>.github.io/<REPOSITORY>/` for a project site.

The package already contains a `.nojekyll` file, so GitHub serves the static files directly.

## 3. Add the custom domain in GitHub first

Before changing DNS, return to **Settings → Pages** and enter:

```text
jwayu.com
```

The package already contains a root `CNAME` file with this value. Keep that file in the publication branch.

GitHub also recommends verifying the domain from the account or organization settings before use. The verification process gives you a TXT record to add at the domain registrar.

## 4. Configure the DNS for `jwayu.com`

At the registrar or DNS provider managing `jwayu.com`, create the following records.

### Required IPv4 records for the apex domain

| Type | Host / Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### Recommended `www` record

| Type | Host / Name | Value |
|---|---|---|
| CNAME | `www` | `<GITHUB-ACCOUNT>.github.io` |

Replace `<GITHUB-ACCOUNT>` with the actual GitHub user or organization name. Do not append the repository name to this DNS value.

When the custom domain in GitHub Pages is `jwayu.com`, GitHub can redirect `www.jwayu.com` to `jwayu.com` once both DNS configurations are correct.

### Optional IPv6 records

| Type | Host / Name | Value |
|---|---|---|
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

Remove conflicting `A`, `AAAA`, `ALIAS`, `ANAME` or `CNAME` records for the same host. Keep unrelated records such as email `MX` records.

DNS propagation can take up to 24 hours.

## 5. Enable HTTPS

After GitHub confirms that the DNS is valid, return to **Settings → Pages** and select **Enforce HTTPS**. The certificate option may take time to become available after a DNS change.

The final public addresses will be:

- English: `https://jwayu.com/`
- Chinese: `https://jwayu.com/zh/`

## 6. Verify the deployment

Check:

- both language pages open correctly;
- the language switch works in both directions;
- the four publication links open arXiv;
- investor and general contact buttons open an email to `yves@ruffenach.net`;
- the browser shows HTTPS without a certificate warning;
- `https://www.jwayu.com` redirects to `https://jwayu.com`.

On Windows, DNS can be checked in PowerShell with:

```powershell
Resolve-DnsName jwayu.com
Resolve-DnsName www.jwayu.com
```

## Official GitHub documentation

- GitHub Pages publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Custom-domain management: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Domain verification: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
