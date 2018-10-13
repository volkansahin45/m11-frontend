let BASE_URL = "http://192.168.1.192:5001";

class Api {
  getMostScannedProducts(){
    return this.fetch(BASE_URL + "/ListBestProducts");
  }

  getProductPricesByBarcode(barcode){
    return this.fetch(BASE_URL + "/GetProductDetailByBarcode?productId=" + barcode)
  }

  fetch(url, options) {
    return fetch(url, options)
      .then(this.handleResponse)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        const typeError = error instanceof TypeError;
        if (typeError) {
          console.log(error)
        }
        return Promise.reject(error);
      });
  }

  handleResponse(response) {
    return new Promise((resolve, reject) => {
      response.json().then((jsonBody) => {
        if (response.ok) {
          return resolve(jsonBody);
        }
        return reject({
          status: response.status,
          headers: response.headers,
          body: jsonBody
        });
      }).catch(() => (response.ok ? resolve(response) : reject(response)));
    });
  }
}

var api = new Api();

export default api;