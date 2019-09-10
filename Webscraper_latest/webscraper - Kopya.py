from flask import Flask, render_template, request, Response
from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
import time, json
app = Flask(__name__)


@app.route("/")
def output():
	return render_template('index.html')

@app.route("/scrape", methods = ['POST'])
def scrape():
    url = request.get_json(force=True)
    print(url)
    url = str(url['url'])

    option = webdriver.FirefoxOptions()
    option.add_argument("-private")
    option.add_argument("-headless")

    browser = webdriver.Firefox()

    browser.get(url)
    time.sleep(5)

    # fetch requested objects

    lead_title = browser.find_element_by_css_selector("h1.clp-lead__title")
    lead_headline = browser.find_element_by_class_name("clp-lead__headline")
    what_you_get_container = browser.find_elements_by_class_name("what-you-get__items")
    incentives_container = browser.find_elements_by_class_name("incentives__list")

    # format string (this is just a sample for now)
    what_you_get = [x.text for x in what_you_get_container]
    what_you_get = '\n'.join(what_you_get)
    what_you_get = what_you_get.split("\n")
    incentives = [x.text for x in incentives_container]
    incentives = '\n'.join(incentives)
    incentives = incentives.split("\n")
    
    json_pyobject = {
        "lead_title": lead_title.text,
        "lead_headline": lead_headline.text,
        "what_you_get": what_you_get,
        "incentives": incentives
    }
    json_string = json.dumps(json_pyobject, ensure_ascii=False).encode('utf-8')
    browser.quit()

    return json_string

if __name__ == "__main__":
    app.run(debug=True)

if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response