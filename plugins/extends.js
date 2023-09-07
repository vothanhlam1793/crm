export default function (context, inject) { 
    const numberWithCommas = function (x) {
        if(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
            return 0;
        }
    }
    const isMobile = () => {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
    }
    inject("numberWithCommas", numberWithCommas);
    inject("isMobile", isMobile);
}