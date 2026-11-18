# Flexibility Lens

**Use it:** https://ai-lab-mackenzie.github.io/flexibility-lens/

A short, interactive diagnostic for project managers and project team members. Through a few pairwise trade-offs, it estimates how much weight you give to each of the four dimensions of cognitive flexibility and shows which of seven preference profiles your view is closest to. It also shows what your view tends to overlook and which profile complements it. In the team view, members paste their result codes to see which views of flexibility the team holds.

Developed by **Fellipe Silva Martins** at the [Laboratório de IA + Estratégia](https://ai-lab-mackenzie.github.io/), Escola de Negócios Mackenzie, Universidade Presbiteriana Mackenzie.

## The research behind it

The app is based on Article 3 of Lidiane Souza's doctoral thesis, *The hierarchy of the dimensions of cognitive flexibility: importance assigned by project team professionals* (Souza & Martins, article in progress).

- **Four dimensions** (from the thesis's Article 2): Awareness of Alternatives (*what*), Processing Agility (*how*), Context Sensitivity (*where and when*) and Agentic Disposition (*who*).
- **Study:** 210 professionals who work in project teams weighted the dimensions with the PAPRIKA pairwise method (1000minds), from June to September 2026.
- **Seven profiles** came from an exploratory cluster analysis: Context readers, Situational executors, Agile executors, Agile adapters, Option explorers, Strategic executors and Agile thinkers. Each profile prioritizes a pair of dimensions. Clustering quality is modest (mean silhouette 0.256), so the profiles are tendencies, not fixed types.

## How it works

1. **Trade-offs.** The app asks the same question as the study's instrument: *"Which of these two people has more flexibility in the way they think?"* Each pair of hypothetical people differs on two dimensions only, and the level descriptions are those shown to the study's participants. Every pair of dimensions gets a high-versus-low question. A follow-up then checks whether the preferred dimension is worth more than twice the other. One repeated question checks consistency, as in the study. That makes 7 to 13 choices in total.
2. **Weights.** Each answer is a linear constraint on the four weights. The value function is linear (low = 0, medium = half, high = full weight), as the study found. The app samples the weight simplex, keeps the samples that break the fewest constraints and averages them, in the spirit of PAPRIKA's feasible region. The same answers always give the same weights.
3. **Profile.** The nearest profile is found by Manhattan distance to the profile averages in Table 4.6 of the article, the same distance the study's cluster analysis used. Each table row gives three of the four weights; the fourth is what remains to reach 100%.
4. **Self-check (optional).** Four first-person items compare what you value with how you see yourself. They give no overall score, because the study recommends looking at flexibility dimension by dimension.

Everything runs in the browser. No answers are sent anywhere; only the user's own browser keeps the last result.

## Disclaimer

This tool is for reflection and learning only. Its results are **not** a psychological or professional assessment, are **not legally binding**, and must not be used for hiring, promotion, dismissal, performance appraisal or any other employment decision. The authors and developers accept no responsibility for the results, their interpretation or any use made of them. The diagnostic describes a person's *views* about what makes someone flexible, not how flexible that person is.

## Running locally

It is a static site with no build step:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. The design follows the Laboratório de IA + Estratégia website (Manual de Identidade Visual Mackenzie: red `#EA0029`, Roboto, the official "M" symbol).

## How to cite

Martins, F. S. (2026). *Flexibility Lens: a diagnostic of views of cognitive flexibility in project teams* [Software]. Laboratório de IA + Estratégia, Universidade Presbiteriana Mackenzie. https://github.com/AI-LAB-MACKENZIE/flexibility-lens

## License

Code released under the MIT License (see `LICENSE`). The Mackenzie symbol and the campus photograph belong to Universidade Presbiteriana Mackenzie and are not covered by that license.
