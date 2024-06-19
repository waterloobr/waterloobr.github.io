
# TODO - would be good to refactor into a JS script
# for generating article tiles to the topic pages

# have initial script take in a folder of images, article txt, mapping of just the short hand
# expect txt to be named with the short hand
"""
article tile content:
* title: str
* blurb: str
* article_page_path: str
* article_cover_path: str

"""

import os

EDITION = "winter-2024"

# Use short_titles to name cover images and the html pages


W24_INPUT = {
    1: {
        "topic": "Business Strategy",
        "title": "The Challenge of Reducing US Dependence of Chinese Manufacturing",
        "short_title": "us-dependency",
        "abbreviation": "us",
        "article_page_path": "",
        "article_cover_path": "",
        "blurb": "Despite the increasing appeal of nearshoring from countries like Mexico and Bangladesh to the United States, due to the rise in US on-shoring, these countries faces inherent limitations like poor infrastructure, a lack of skilled labour, and security uncertainties that prevent them from fully replacing the deeply interwoven relationship China has in manufacturing exports to the United States..."
    },
    2: {
        "topic": "Business Strategy",
        "title": "Gridlock: The Pitfalls of F1's Failed Expansion into America",
        "short_title": "f1",
        "abbreviation": "f1",
        "article_page_path": "",
        "article_cover_path": "",
        "blurb": "Formula 1, the pinnacle of motorsport, has long been revered for its blend of speed, technology, and prestige. However, despite its global popularity and iconic status, Formula 1 has encountered numerous challenges in its quest to establish a firm foothold in the American market. From misjudging the transition from Netflix to live viewership, to grappling with a lack of competitiveness and a flawed economic model, F1's expansion efforts in America have been met with significant roadblocks..."
    },
    3: {
        "topic": "Business Strategy",
        "title": "Changing Skies: The Importance of Maintaining Our Budget Airlines",
        "short_title": "budget-airlines",
        "abbreviation": "ba",
        "article_page_path": "",
        "article_cover_path": "",
        "blurb": "In January 2024, US federal courts ruled against the proposed merger of JetBlue and Spirit Airlines, leaving Spirit in shaky financial territory, unable to compete with larger airlines. The primary rationale for rejecting this merger was to preserve competition in space, the court fearing that further joint ventures of airlines would have consumers at the mercy of predatory pricing practices. One month later, Lynx Air, a Canadian low-cost airline carrier (LCC), announced bankruptcy and closure only two years after its launch, citing financial difficulties and inability to compete with market giants Air Canada and WestJet..."
    },
    4: {
        "topic": "Business Strategy",
        "title": "Buy Now, Securitize Later: BNPL’s Growing Risks in an Unregulated World",
        "short_title": "bnpl",
        "abbreviation": "bnpl",
        "article_page_path": "",
        "article_cover_path": "",
        "blurb": "Buy Now Pay Later, better known as BNPL, has taken the world by storm. While BNPL companies have been growing and raising meaningful capital for over a decade, it is only in the last couple years that the term has really entered mainstream parlance. That should come as no surprise, considering that the BNPL market is a nascent market that is growing at a rapid pace, with transaction value doubling from $159B in 2021 to $316B in 2023, and an expected increase of more than 40% to $452B in 2027..."
    },
    5: {
        "topic": "Business Strategy",
        "title": "",
        "short_title": "digital-banking",
        "abbreviation": "db",
        "article_page_path": "",
        "article_cover_path": "",
        "blurb": "Unbeknownst to most people, digital banking is not exactly a new concept. Back in 1988, Dutch bank ING established one of the world’s first relatively comprehensive digital infrastructures and began a process to integrate digital within their larger hierarchy of services. For almost 40 years, digital banking has been nothing but a facet of a larger, more diversified omnichannel approach. While one can argue that increasing dependence on technology over the past decade has inflated its importance..."
    },
    6: {
        "topic": "Business Strategy",
        "title": "Revisiting European Energy: Mending a Fractured Market",
        "short_title": "european-energy",
        "abbreviation": "ee",
        "article_page_path": "",
        "article_cover_path": "",
        "blurb": "In 2021, Europe prospered in a favourable macroeconomic environment, with the public equities market up around 18% at its max. Private equity transaction activity had reached new highs as the world began to recover from the economic and health-related fears instilled by the pandemic. However, markets had little time for relief before escalations of the Russian-Ukraine war sparked a historical energy crisis. The EU scrambled to meet energy demand..."
    },
}

OUTPUT_DIR = 'utils/output'

def generate_body():


    html_file_path = os.path.join(OUTPUT_DIR, EDITION + ".html")

    for key, article in W24_INPUT.items():
        # INPUTS
        article_topic = article["topic"]
        article_title = article["title"]
        article_blurb = article["blurb"]
        short_title = article["short_title"]
        abbreviation = article["abbreviation"]

        article_page_path = f"articles/{EDITION}/{short_title}.html"    # articles/{edition}/{filename}.html
        article_cover_path = f"assets/img/{EDITION}/covers/{abbreviation}-cover.jpg" 

        # create html file
        with open(html_file_path, 'a', encoding='utf-8') as f:
            
            # blocks to paste into the respective file  
            f.write('<!-- single-job-content -->\n')
            f.write('<div class="single-job-items mb-30">\n')
            f.write('   <div class="job-items">\n')
            f.write('       <div class="company-img">\n')
            f.write(f'          <a href="{article_page_path}"><img src="{article_cover_path}" alt="" width="200"></a>\n')
            f.write('       </div>\n')
            f.write('       <div class="job-tittle">\n')
            f.write(f'       <span>{article_topic}</span>\n')
            f.write(f'       <a href="{article_page_path}"><h4>{article_title}</h4></a>\n')
            f.write(f'      <p>{article_blurb}</p>\n')
            f.write('       </div>\n')
            f.write('   </div>\n')
            f.write('</div>\n')
            f.write('\n')

        f.close()

generate_body()

