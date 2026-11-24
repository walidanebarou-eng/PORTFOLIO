# E-Portfolio — Walid Anebarou

Portfolio statique (HTML, CSS, JavaScript) présentant le parcours, les compétences, les stages et les projets de Walid Anebarou, étudiant en Master MRMI (Mécanique, Robotique et Matériaux Innovants) à l'ENSET Mohammedia. Il est conçu pour GitHub Pages : aucun backend, aucune collecte de données, aucune dépendance externe (ni CDN, ni police distante).

## Structure

```
index.html … (25 pages)   Pages du site, générées par tools/build.py
404.html                  Page d'erreur personnalisée
style.css · script.js     Styles et scripts uniques (menu mobile, retour en haut, agrandissement d'images)
favicon.svg · sitemap.xml · robots.txt · .nojekyll
assets/
  cv/                     CV en PDF (FR, EN)
  stages/<entreprise>/    Rapports (PDF), présentations (PPTX + version PDF), plans et photos
  projets_academiques/    Rapports et présentations des projets
  certificats/            Attestations de cours en PDF
  img/                    Images optimisées (WebP + JPG de secours)
  preview.jpg             Image de prévisualisation (partage sur les réseaux)
tools/
  content.py              Tous les textes et la liste des documents (à modifier)
  build.py                Génère les pages HTML à partir de content.py
  check_site.py           Vérifie liens, images, titres, métadonnées
  browser_test.py         Tests navigateur optionnels (Playwright)
```

Les originaux sont conservés dans `assets/`. Les `.pptx` ont une version PDF du même nom (générée avec LibreOffice) pour la lecture sur mobile : vérifier le rendu avant de s'y fier.

## Pages principales

Accueil · Profil · Expériences (3 stages) · Projets (vitrine : 1 projet professionnel, 6 académiques) · Compétences · Documents (CV, stages, dossiers de projets, certificats). Chaque stage et projet a une page détaillée, avec fil d'Ariane et liens précédent/suivant.

## Tester en local

```bash
python3 -m http.server 8000      # puis ouvrir http://localhost:8000
python3 tools/check_site.py      # contrôle statique (sans dépendance)
pip install playwright && playwright install chromium
python3 tools/browser_test.py    # tests navigateur (optionnel)
```

## Déployer sur GitHub Pages

1. Dans `tools/content.py`, remplacer `SITE["url"]` par l'URL réelle (ex. `https://utilisateur.github.io/depot/`), puis lancer `python3 tools/build.py`. Cela corrige `canonical`, Open Graph, `sitemap.xml`, `robots.txt` et la page 404.
2. Envoyer le contenu du dossier dans un dépôt GitHub.
3. Settings → Pages → Source : branche `main`, dossier `/ (root)`.

## Mettre à jour le portfolio

- **Modifier un texte, un projet, une compétence** : éditer `tools/content.py`, lancer `python3 tools/build.py`, puis `python3 tools/check_site.py`.
- **Ajouter un document** : copier le fichier dans `assets/…`, ajouter une ligne `D(...)` dans le projet concerné, régénérer. Le build échoue si le fichier n'existe pas.
- **Ajouter un certificat** : une ligne dans `CERTS`. Les certificats absents de l'archive (CATIA Part Design, Assembly Design, Generative Shape Design, MATLAB, Python) ne sont pas affichés tant que leur PDF n'existe pas.
- **Afficher le téléphone dans le pied de page** : `show_phone: True` dans `SITE`.

Le workflow `.github/workflows/check.yml` régénère les pages et lance les contrôles à chaque push.
