import {News} from "../pages/home/News";
import {add_news} from "./action";
import {Subject} from "rxjs";

export interface AppState {
  news: Subject<News>;
  lastUpdate: Date;
}
export function rootReducer(state, action) { // Our root reducer describing what happens to state when
  // each action takes place. Returns new state object With new modifications
  switch (action.type) { // Switch between action types
    case add_news:
      //Subject.next used to add a news object to the Subject
      state.news.next(action.newsobj)
      return Object.assign({}, state, {
        news: state.news,
        lastUpdate: new Date()
      });
  }

  return state
}

export const INITIAL_STATE: AppState = {
  news: new Subject<News>(),
  lastUpdate: null
};
