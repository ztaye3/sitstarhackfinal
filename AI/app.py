import flask
# Dependencies
from flask import request, jsonify
import joblib
import traceback
import pandas as pd
import datetime

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['POST'])
def home():
    lr = joblib.load("submission_model.sav")
    print ('Model loaded')
    model_columns = joblib.load("submission_model_columns.sav")
    print ('Model columns loaded')
    if lr:
        try:
            json_ = request.json
            print(json_)
            query = pd.read_csv("submission_testing_api.csv")

            date_time_obj = datetime.datetime.strptime(json_["reserv_date"], '%Y-%m-%d %H:%M:%S')
            depart_time_obj = datetime.datetime.strptime(json_["departure_date"], '%Y-%m-%d %H:%M:%S')
            arrival_time_obj = datetime.datetime.strptime(json_["arrival_date"], '%Y-%m-%d %H:%M:%S')

            hours_conv = abs(datetime.datetime(date_time_obj.year, 1,1) - date_time_obj).total_seconds() / 3600.0
            departure_hours_conv = abs(datetime.datetime(depart_time_obj.year, 1,1) - depart_time_obj).total_seconds() / 3600.0
            arrival_hours_conv = abs(datetime.datetime(arrival_time_obj.year, 1,1) - arrival_time_obj).total_seconds() / 3600.0

            query["res_dt"] = hours_conv
            query["train_nr"] = json_["train_nr"]
            query["dep_ist"] = departure_hours_conv
            query["arr_ist"] = arrival_hours_conv

            prediction = list(lr.predict(query))

            return jsonify({'prediction': str(prediction)})
        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        return ('No model here to use')

app.run()