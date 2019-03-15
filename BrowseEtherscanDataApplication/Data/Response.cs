using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BrowseEtherscanDataApplication.Data
{
    public class Response
    {        
        public string status { get; set; }
        public string message { get; set; }
        public BlockChainData[] result { get; set; }
    }

    public class BlockChainData
    {
        public string address { get; set; }
        public string[] topics { get; set; }
        public string data { get; set; }
        public string blockNumber { get; set; }
        public string timeStamp { get; set; }
        public string gasPrice { get; set; }
        public string gasUsed { get; set; }
        public string logIndex { get; set; }
        public string transactionHash { get; set; }
        public string transactionIndex { get; set; }
    }

}