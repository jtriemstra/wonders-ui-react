class Utility {
    static apiServer() {
        if (process.env.APP_ENV === 'prod'){
            return "https://jtriemstra-dominion-api.herokuapp.com";
        }
        else {
            return "http://localhost:8080";
            //return "http://jtriemstradominionapi-env.eba-wcyvhkpu.us-east-2.elasticbeanstalk.com";
        }        
    }

    static getRequestInit(){
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');

        var myInit = {
            method: 'GET',
            headers: myHeaders,
        };

        return myInit;
    }
}

export default Utility;
