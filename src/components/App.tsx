import React from "react";
import classNames from "classnames";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Router from "./Router";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useParams,
  useLocation,
} from "react-router-dom";
import { Item } from "../model";
import { Messages, MessagesProvider } from "../context/MessagesContext";

interface Params {
  page: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RouterWithPageParam = ({
  items,
  releases,
}: {
  items: Item[];
  releases: string[];
}) => {
  const { page } = useParams<Params>();
  const query = useQuery();

  return (
    <Router
      pageName={page}
      search={query.get("search") || ""}
      items={items}
      releases={releases}
    />
  );
};

const HeaderWithPageParam = () => {
  const { page } = useParams<Params>();

  return <Header pageName={page} />;
};

const FooterWithPageParam = ({ items }: { items: Item[] }) => {
  const { page } = useParams<Params>();

  return <Footer pageName={page} items={items} />;
};

interface Data {
  items: Item[];
  releases: string[];
}

export default function App() {
  const [data, setData] = React.useState<Data>();
  const [messages, setMessages] = React.useState<Messages>();

  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/rd.json`)
      .then((response) => response.json())
      .then((data: Data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("fetch data", error);
      });

    fetch(`${process.env.PUBLIC_URL}/messages.json`)
      .then((response) => response.json())
      .then((messages: Messages) => {
        setMessages(messages);
      })
      .catch((error) => {
        console.error("fetch messages", error);
      });
  }, []);

  if (data && messages) {
    const { items, releases } = data;
    return (
      <MessagesProvider messages={messages}>
        <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
          <Switch>
            <Route path={"/:page(.+).html"}>
              <div>
                <div className="page">
                  <div className="page__header">
                    <HeaderWithPageParam />
                  </div>
                  <div className={classNames("page__content")}>
                    <RouterWithPageParam items={items} releases={releases} />
                  </div>
                  <div className="page__footer">
                    <FooterWithPageParam items={items} />
                  </div>
                </div>
              </div>
            </Route>
            <Route path={"/"}>
              <Redirect to={"/index.html"} />
            </Route>
          </Switch>
        </BrowserRouter>
      </MessagesProvider>
    );
  }

  return null;
}
