import React from "react";
import classNames from "classnames";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Router from "./Router";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { Item } from "../model";
import { Messages, MessagesProvider } from "../context/MessagesContext";
import { ConfigData } from "../config";

const useFetch = <D extends unknown>(url: string): D | undefined => {
  const [data, setData] = React.useState<D>();

  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: D) => {
        setData(data);
      })
      .catch((error) => {
        console.error(`fetch ${url} failed. Did the file exist?`, error);
      });
  }, [url]);

  return data;
};

const useQuery = () => new URLSearchParams(useLocation().search);

const usePage = (params: Record<string, string | undefined>) => {
  return (params['*'] || '').replace(".html", "");
};

const RouterWithPageParam = ({
  items,
  releases,
  config,
}: {
  items: Item[];
  releases: string[];
  config: ConfigData;
}) => {
  const page = usePage(useParams());
  const query = useQuery();

  return (
    <Router
      pageName={page || ""}
      search={query.get("search") || ""}
      items={items}
      releases={releases}
      config={config}
    />
  );
};

const HeaderWithPageParam = () => {
  const page = usePage(useParams());

  return <Header pageName={page || ""} />;
};

const FooterWithPageParam = ({ items }: { items: Item[] }) => {
  const page = usePage(useParams());

  return <Footer pageName={page || ""} items={items} />;
};

interface Data {
  items: Item[];
  releases: string[];
}

export default function App() {
  const data = useFetch<Data>(`${process.env.PUBLIC_URL}/rd.json`);
  const messages = useFetch<Messages>(
    `${process.env.PUBLIC_URL}/messages.json`
  );
  const config = useFetch<ConfigData>(`${process.env.PUBLIC_URL}/config.json`);

  if (data && config) {
    const { items, releases } = data;
    return (
      <MessagesProvider messages={messages}>
        <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
          <Routes>
            <Route
              path={"/*"}
              element={
                <div>
                  <div className="page">
                    <div className="page__header">
                      <HeaderWithPageParam />
                    </div>
                    <div className={classNames("page__content")}>
                      <RouterWithPageParam
                        config={config}
                        items={items}
                        releases={releases}
                      />
                    </div>
                    <div className="page__footer">
                      <FooterWithPageParam items={items} />
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path={"/"}
              element={<Navigate replace to={"/index.html"} />}
            />
          </Routes>
        </BrowserRouter>
      </MessagesProvider>
    );
  }

  return null;
}
