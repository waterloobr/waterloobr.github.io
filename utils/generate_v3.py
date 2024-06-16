import os

# issues:
"""
* no sorting, so no predictable order for what to input
* seems to lose paragraphs?
* how are multiple empty lines handles
* it seems to assume one tag per line?
"""

img_count = 1


EDITION = "winter-2024"
ARTICLE_TYPES = {
    "1": ("Business Strategy", "business_strategy"),
    "2": ("Technology", "technology"),
}


def generate_body():

    # loop through all input files
    input_files = os.listdir("utils/input")
    for file in input_files:
        content = ""
        file_path = os.path.join("utils/input", file)
       
        with open(file_path, "r", encoding='utf-8') as i:
            content = i.read()

        output_dir = 'utils/output'
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        print(f"now opening: {file_path}")
        # edition = input("Enter edition: ") 
        edition = EDITION

        article_type = input("Enter article type:")
        img_dir = input("Enter image directory: ") 
        sh = input("Enter sh (shorthand): ")
        display_title = input("Enter display title: ")
        html_file_name = input("Enter html filename: ")

        article_type_title, article_type_page = ARTICLE_TYPES[article_type]

        title = ""

        for line in content.split('\n'):
            if '[t]' in line:
                title = line.replace("[t]", "")
                break

        # create html file
        name = os.path.normpath(i.name).split(os.path.sep)[-1]
        name = name[:name.rindex(".")]
        html_file_path = os.path.join(output_dir, name + ".html")

        with open(html_file_path, 'w', encoding='utf-8') as f:
            
            # general page header   
            f.write('<!doctype html>\n')
            f.write('<html class="no-js" lang="zxx">\n')
            f.write('<head>\n')
            f.write('<meta charset="utf-8">\n')
            f.write('<meta http-equiv="x-ua-compatible" content="ie=edge">\n')
            f.write('<title>Waterloo Business Review</title>\n')
            f.write('<meta name="description" content="">\n')
            f.write('<meta name="viewport" content="width=device-width, initial-scale=1">\n')
            f.write('<!-- sets base directory to top level -->\n')
            f.write('<base href="/" />\n')
            f.write('<link rel="manifest" href="site.webmanifest">\n')
            f.write('<link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.ico">\n')
            f.write('<!-- CSS here -->\n')
            f.write('<link rel="stylesheet" href="assets/css/bootstrap.min.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/owl.carousel.min.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/slicknav.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/flaticon.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/progressbar_barfiller.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/gijgo.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/animate.min.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/animated-headline.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/magnific-popup.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/fontawesome-all.min.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/themify-icons.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/slick.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/nice-select.css">\n')
            f.write('<link rel="stylesheet" href="assets/css/style.css">\n')
            f.write('</head>\n')
            f.write('<body>\n')
            f.write('<!-- ? Preloader Start -->\n')
            f.write('<div id="preloader-active">\n')
            f.write('<div class="preloader d-flex align-items-center justify-content-center">\n')
            f.write('<div class="preloader-inner position-relative">\n')
            f.write('<div class="preloader-circle"></div>\n')
            f.write('<div class="preloader-img pere-text">\n')
            f.write('<img src="assets/img/logo/wbr-logo.svg" alt="">\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('<!-- Preloader Start-->\n')
            f.write('<header>\n')
            f.write('<!-- Header Start -->\n')
            f.write('<div class="header-area">\n')
            f.write('<div class="main-header ">\n')
            f.write('<div class="header-top ">\n')
            f.write('<div class="container-fluid">\n')
            f.write('<div class="col-xl-12">\n')
            f.write('<div class="row d-flex justify-content-lg-between align-items-center">\n')
            f.write('<div class="header-info-left">\n')
            f.write('<div class="logo">\n')
            f.write('<a href="index.html"><img src="assets/img/logo/wbr-logo-small.svg" alt=""></a>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('<div class="header-info-right d-flex align-items-center">\n')
            f.write('<ul>\n')
            f.write('<li><a href="about.html">About</a></li>\n')
            f.write('<li><a href="team.html">Team</a></li>\n')
            f.write('<li><a href="contact.html">Contact</a></li>\n')
            f.write('<li><a href="publications.html">Publications</a></li>\n')
            f.write('</ul>\n')
            f.write('<!-- Social -->\n')
            f.write('<div class="header-social">\n')
            f.write('<a href="https://www.facebook.com/waterloobr/"><i class="fab fa-facebook-f"></i></a>\n')
            f.write('<a href="https://twitter.com/uwaterloobr/"><i class="fab fa-twitter"></i></a>\n')
            f.write('<a href="https://www.linkedin.com/company/waterloo-business-review/about"><i class="fab fa-linkedin"></i></a>\n')
            f.write('<a href="https://www.instagram.com/uwaterloobr/"><i class="fab fa-instagram"></i></a>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('<div class="header-bottom  header-sticky">\n')
            f.write('<div class="container-fluid">\n')
            f.write('<div class="row align-items-center">\n')
            f.write('<div class="col-12">\n')
            f.write('<!-- logo 2 -->\n')
            f.write('<!-- Main-menu -->\n')
            f.write('<div class="main-menu text-center d-none d-lg-block">\n')
            f.write('<nav>\n')
            f.write('<ul id="navigation">\n')
            f.write('<li><a href="topics/alumni_insights.html">Alumni Insights</a></li>\n')
            f.write('<li><a href="topics/business_strategy.html">Business Strategy</a></li>\n')
            f.write('<li><a href="topics/entrepreneurship.html">Entrepeneurship</a></li>\n')
            f.write('<li><a href="topics/technology.html">Technology</a></li>\n')
            f.write('</ul>\n')
            f.write('</nav>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('<!-- Mobile Menu -->\n')
            f.write('<div class="col-12">\n')
            f.write('<div class="mobile_menu d-block d-lg-none"></div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</header>\n')
            f.write('<main>\n')
            f.write('<!-- breadcrumb Start-->\n')
            f.write('<div class="page-notification">\n')
            f.write('<div class="container">\n')
            f.write('<div class="row">\n')
            f.write('<div class="col-lg-12">\n')
            f.write('<nav aria-label="breadcrumb">\n')
            f.write('<ol class="breadcrumb justify-content-center">\n')
            f.write('<li class="breadcrumb-item"><a href="index.html">Home</a></li>\n')
            f.write(f'"<li class="breadcrumb-item"><a href="topics/{article_type_page}.html">{article_type_title}</a></li>\n')
            f.write(f'<li class="breadcrumb-item"><a href="articles/{edition}/{html_file_name}.html"></a>{display_title}</li>\n')
            f.write('</ol>\n')
            f.write('</nav>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('<!-- breadcrumb End -->\n')

            # header
            f.write('<!-- Post Details Stat -->\n')
            f.write('<div class="post-details pb-80">\n')
            f.write('<div class="container">\n') 
            f.write('<div class="row">\n') 
            f.write('<div class="col-lg-8">\n') 
            f.write('<div class="about-details-cap">\n') 
            f.write(f'<h2>{title}</h2>\n') 
            f.write('</div>\n') 
            f.write('</div>\n') 
            f.write('<div class="col-lg-10">\n') 
            f.write('<div class="about-details-cap">\n') 

            # content generation =============================
            img_count = 1

            for line in content.split('\n'):
                if len(line.strip()) == 0 or '[t]' in line:
                    continue
                elif '[s]' in line:
                    f.write(f'<p class="mb-30"><b>{line.replace("[s]", "")}</b></p>\n')
                elif '[i]' in line:
                    # split by the image tag and write paragraph

                    parts = line.split('[i]')

                    f.write(f'<p> {parts[0]} </p>\n')
            
                    f.write(f'<div class="details-img">\n')
                    f.write(f'<img class="img-fluid mb-15" src="assets/img/{edition}/articles/{img_dir}/{sh}-{img_count}.svg" alt="" style="vertical-align:top;margin:10px 0px; max-height: 500px">\n')
                    f.write(f'</div>\n')

                    f.write(f'<p> {parts[1]} </p>\n')
                    img_count += 1
                else:
                    f.write(f'<p> {line} </p>\n')

            # footer
            f.write('</div>\n') 
            f.write('</div>\n') 
            f.write('</div>\n') 
            f.write('</div>\n') 
            f.write('<!-- Post Details End -->\n')

            # page footer
            f.write('<footer>\n')
            f.write('<!-- footer-bottom area -->\n')
            f.write('<div class="footer-bottom-area">\n')
            f.write('<div class="container">\n')
            f.write('<div class="footer-border">\n')
            f.write('<div class="row align-items-center justify-content-center">\n')
            f.write('<div class="col-xl-9 col-lg-8">\n')
            f.write('<div class="footer-copy-right text-center">\n')
            f.write('<p>Waterloo Business Review © 2024</p>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('</div>\n')
            f.write('<!-- Footer End-->\n')
            f.write('</footer>\n')
            f.write('<!-- Scroll Up -->\n')
            f.write('<div id="back-top">\n')
            f.write('<a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>\n')
            f.write('</div>\n')
            f.write('<!-- JS here -->\n')
            f.write('<script src="./assets/js/vendor/modernizr-3.5.0.min.js"></script>\n')
            f.write('<!-- Jquery, Popper, Bootstrap -->\n')
            f.write('<script src="./assets/js/vendor/jquery-1.12.4.min.js"></script>\n')
            f.write('<script src="./assets/js/popper.min.js"></script>\n')
            f.write('<script src="./assets/js/bootstrap.min.js"></script>\n')
            f.write('<!-- Jquery Mobile Menu -->\n')
            f.write('<script src="./assets/js/jquery.slicknav.min.js"></script>\n')
            f.write('<!-- Jquery Slick , Owl-Carousel Plugins -->\n')
            f.write('<script src="./assets/js/owl.carousel.min.js"></script>\n')
            f.write('<script src="./assets/js/slick.min.js"></script>\n')
            f.write('<!-- One Page, Animated-HeadLin -->\n')
            f.write('<script src="./assets/js/wow.min.js"></script>\n')
            f.write('<script src="./assets/js/animated.headline.js"></script>\n')
            f.write('<script src="./assets/js/jquery.magnific-popup.js"></script>\n')
            f.write('<!-- Date Picker -->\n')
            f.write('<script src="./assets/js/gijgo.min.js"></script>\n')
            f.write('<!-- Nice-select, sticky -->\n')
            f.write('<script src="./assets/js/jquery.nice-select.min.js"></script>\n')
            f.write('<script src="./assets/js/jquery.sticky.js"></script>\n')
            f.write('<!-- Progress -->\n')
            f.write('<script src="./assets/js/jquery.barfiller.js"></script>\n')
            f.write('<!-- counter , waypoint,Hover Direction -->\n')
            f.write('<script src="./assets/js/jquery.counterup.min.js"></script>\n')
            f.write('<script src="./assets/js/waypoints.min.js"></script>\n')
            f.write('<script src="./assets/js/jquery.countdown.min.js"></script>\n')
            f.write('<script src="./assets/js/hover-direction-snake.min.js"></script>\n')
            f.write('<!-- contact js -->\n')
            f.write('<script src="./assets/js/contact.js"></script>\n')
            f.write('<script src="./assets/js/jquery.form.js"></script>\n')
            f.write('<script src="./assets/js/jquery.validate.min.js"></script>\n')
            f.write('<script src="./assets/js/mail-script.js"></script>\n')
            f.write('<script src="./assets/js/jquery.ajaxchimp.min.js"></script>\n')
            f.write('<!-- Jquery Plugins, main Jquery -->\n')
            f.write('<script src="./assets/js/plugins.js"></script>\n')
            f.write('<script src="./assets/js/main.js"></script>\n')
            f.write('</body>\n')
            f.write('</html>\n')

        i.close()
        f.close()

generate_body()

