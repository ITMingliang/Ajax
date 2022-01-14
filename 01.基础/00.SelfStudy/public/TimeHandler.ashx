public class TimeHandler : IHttpHandler
    {
 
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(DateTime.Now.ToString("yyy-MM-dd hh:mm:ss"));
        }
 
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }