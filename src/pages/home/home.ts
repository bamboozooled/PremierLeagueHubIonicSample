import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable, Subject} from "rxjs";
import {AppState} from "../../app/store";
import {NgRedux, select} from "@angular-redux/store";
import {add_news} from "../../app/action";
import {News} from "./News";
import {newsSource} from "./newsSource";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @select() news
  @select() lastUpdate;
  arrayNS: newsSource[] = [];
  newsObject: News[] = [];
  constructor(private ngRedux: NgRedux<AppState>, public navCtrl: NavController, private http: HttpClient) {
    //Gets state and the news subject. I then subscribe to the subject
    this.ngRedux.getState().news.subscribe((data) => {
      this.newsObject.push(data)
    });
    this.populateNewsSources()
    this.getNews()

  }

  populateNewsSources(){

    const url1 = new newsSource("https://api.rss2json.com/v1/api.json?rss_url=https://www.independent.co.uk/sport/" +
      "football/rss&api_key=625ngfnvbfttenujutekitquodmxr6svubft2cb0&count=10","Independent");
    const url2 = new newsSource("https://api.rss2json.com/v1/api.json?rss_url=https://talksport.com/rss/football/" +
      "premier-league/feed&api_key=625ngfnvbfttenujutekitquodmxr6svubft2cb0&count=10","TalkSport");
    const url3 = new newsSource("https://eplhubapi.appspot.com/espn","ESPN");
    const url5 = new newsSource("https://eplhubapi.appspot.com/dailymail","Metro");
    const url6 = new newsSource("https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/sport/" +
      "football/rss.xml?edition=uk&api_key=625ngfnvbfttenujutekitquodmxr6svubft2cb0&count=10", "Daily Mail");
    const url7 = new newsSource("https://eplhubapi.appspot.com/foxs", "BBC");

    this.arrayNS = [url1, url2, url6]
  }

  getNews(){
    //Using JSONP to get data from server. Data is dispatched to Redux store.
    for (let i = 0; i<this.arrayNS.length; i++){
      this.http.jsonp(this.arrayNS[i].link, 'callback').subscribe((data) => {
        const dataItems = data["items"];
        console.log(dataItems)
        for (let j = 0; j < dataItems.length; j++){
          const newsItem = new News(dataItems[j]["title"], dataItems[j]["link"], dataItems[j]["thumbnail"],
            dataItems[j]["description"], "Sample Source", dataItems[j]["pubDate"])
          this.ngRedux.dispatch({type: add_news, newsobj: newsItem})
        }
      })
    }
  }




}
