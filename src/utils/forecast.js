const request=require('request')

const forecast=(latitude,longitude,callback)=>
{ const url='http://api.weatherstack.com/current?access_key=0aee4d729cfdc252bea0e30b733e1310&query='+ latitude+','+ longitude +'&units=m'
 request({url,json:true},(error,{body}={})=>
 {if(error)
     {
         callback('Unable to connect to Web Services.',undefined)
     }
     else if(body.error){
             callback('Try another location.',undefined)
     }
     else
     {
 callback(undefined,body.current.weather_descriptions[0] +'. It is '+ body.current.temperature +' degrees. But it feelslike ' + body.current.feelslike+' degress out.' )
     }
 }
     )
}
module.exports=forecast