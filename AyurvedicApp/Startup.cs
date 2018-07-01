using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AyurvedicApp.Startup))]
namespace AyurvedicApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
