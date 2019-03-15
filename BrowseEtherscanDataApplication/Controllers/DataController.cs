using BrowseEtherscanDataApplication.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BrowseEtherscanDataApplication.Controllers
{
    public class DataController : ApiController
    {
        private static Response GlobalResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<Response>(File.ReadAllText(System.IO.Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory.ToString(), "Data\\data.json")));
       
        // GET: api/Data
        public HttpResponseMessage Get()
        {
            string Json= Newtonsoft.Json.JsonConvert.SerializeObject(GlobalResponse);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(Json, System.Text.Encoding.UTF8, "application/json");
            return response;
            //return GlobalResponse;
        }

        // GET: api/Data/5
        public HttpResponseMessage Get(int id)
        {
            Response newresponse = new Response();
            BlockChainData[] result= Array.FindAll(GlobalResponse.result, x => int.Parse(x.blockNumber.Remove(0, 2), System.Globalization.NumberStyles.HexNumber) == id);
            if (result == null || result.Length<=0)
            {
                newresponse.message = "Invalid Block ID";
                newresponse.status = "0";           
            }
            else
            {
                newresponse.message = "OK";
                newresponse.status = "1";
                newresponse.result = result;
            }
            string Json = Newtonsoft.Json.JsonConvert.SerializeObject(newresponse);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(Json, System.Text.Encoding.UTF8, "application/json");
            return response;         
        }

        // POST: api/Data
        public void Post([FromBody]string value)
        {
            Response response = new Response();
            response.message = "Invalid Action";
            response.status = "0";
        }

        // PUT: api/Data/5
        public void Put(int id, [FromBody]string value)
        {
            Response response = new Response();
            response.message = "Invalid Action";
            response.status = "0";
        }

        // DELETE: api/Data/5
        public void Delete(int id)
        {
            Response response = new Response();
            response.message = "Invalid Action";
            response.status = "0";
        }
    }
}
