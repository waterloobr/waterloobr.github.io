import os

# issues:
"""
* no sorting, so no predictable order for what to input
* seems to lose paragraphs?
* how are multiple empty lines handles


"""

img_count = 1

def generate_body():
    # loop through all input files
    input_files = os.listdir("utils/input")
    for file in input_files:
        content = ""
        file_path = os.path.join("utils/input", file)
        with open(file_path, "r", encoding='utf-8') as i:
            content = i.read()

        # with open("utils\input\input.txt", "r") as f:
        #     content = f.read()

        output_dir = 'utils/output'
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        print(f"now opening: {file_path}")
        edition = input("Enter edition: ") 
        img_dir = input("Enter image directory: ") 
        sh = input("Enter sh (shorthand): ")
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

            # content

            img_count = 1

            for line in content.split('\n'):
                if len(line.strip()) == 0 or '[t]' in line:
                    continue
                elif '[s]' in line:
                    f.write(f'<p class="mb-30"><b>{line.replace("[s]", "")}</b></p>\n')
                elif '[i]' in line:
                    f.write(f'<div class="details-img">\n')
                    f.write(f'<img class="img-fluid mb-15" src="assets/img/{edition}/articles/{img_dir}/{sh}-{img_count}.svg" alt="" style="vertical-align:top;margin:10px 0px; max-height: 500px">\n')
                    f.write(f'</div>\n')

                    img_count += 1
                else:
                    f.write(f'<p> {line} </p>\n')

            # footer
            f.write('</div>\n') 
            f.write('</div>\n') 
            f.write('</div>\n') 
            f.write('</div>\n') 
            f.write('<!-- Post Details End -->\n')

        i.close()
        f.close()

generate_body()

