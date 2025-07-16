function dameAnalytics(evento) {
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
    import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDZYWr3jGf1WM6Wry1YJU67plv16lcAWeA",
      authDomain: "factudata-home.firebaseapp.com",
      projectId: "factudata-home",
      storageBucket: "factudata-home.appspot.com",
      messagingSenderId: "214267828048",
      appId: "1:214267828048:web:43df2ccd8830ca1ec17e55",
      measurementId: "G-H1G436VC5Q"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    return analytics;
}

on('click', '#proba-sorby', function(e) {
    console.log("hahahaha")

 })


    