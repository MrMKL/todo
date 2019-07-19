const fetch = require('node-fetch')


promise = fetch('http://xml.smg.gov.mo/c_api.xml', {
  mode: 'cors'
})
    .then(res => res.text())
    .then(body => {

      var parseString = require('xml2js').parseString;
      parseString(body, function (err, result) {
          console.log("Time:", result.IQA.System[0].SysPubdate[0])

          let aaa = {}
          result.IQA.Custom[0].AQIReport.forEach(report => {
            const Stationname = report.Station[0].Stationname[0];
            const RecordTime = report.Station[0].AQI[0].RecordTime[0];
            const Value = report.Station[0].AQI[0].Value[0];
            const Description = report.Station[0].AQI[0].AQIDescription[0];
            const Element = report.Station[0].AQI[0].Element[0];

            aaa[Stationname] = {
              Stationname,
              RecordTime,
              Value,
              Description,
              Element
            }
          })

          console.log(aaa)

      });

    });
