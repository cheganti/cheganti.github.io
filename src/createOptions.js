export class NewsArtiles {
    constructor(fname, lname, age, address) {
       this.fname = fname;
       this.lname = lname;
       this.age = age;
       this.address = address;
    }
 
    fullname() {
       return this.fname +"-"+this.lname;
    }
    test(){
        return 3 + 4;
    }
        newsOptions() {
        const select = document.getElementById("apiUrl");
        let options = ["CNBC", "mashable", "bbc-news", "cnn"];
        options.forEach(item => {
            let el = document.createElement("option");
            el.textContent = item;
            el.value = item;
            select.appendChild(el);
        });
    }
 }