import classNames from "classnames";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import { ConfigData, publicUrl } from "../config";
import { useConfig } from "../context/ConfigContext/ConfigContext";
import { Messages, MessagesProvider } from "../context/MessagesContext";
import { useSearchParamState } from "../hooks/use-search-param-state";
import { Item, filteredOnly, getTags } from "../model";
import DrawerRight from "./DrawerRight/DrawerRight";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Router from "./Router";

export const useFetch = <D extends unknown>(url: string): D | undefined => {
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

const usePage = (params: Record<string, string | undefined>) => {
  return (params["*"] || "").replace(".html", "");
};

const useFilteredItems = ({ items }: { items: Item[] }) => {
  const [searchParamState] = useSearchParamState();
  const { tags } = searchParamState;

  return tags ? filteredOnly(items, tags) : items;
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
  const [searchParamState] = useSearchParamState();
  const { search } = searchParamState;
  const filteredItems = useFilteredItems({ items });

  return (
    <Router
      pageName={page || ""}
      search={search || ""}
      items={filteredItems}
      releases={releases}
      config={config}
    />
  );
};

const HeaderWithPageParam = ({ items }: { items: Item[] }) => {
  const page = usePage(useParams());
  const tags = getTags(items);

  return <Header pageName={page || ""} tags={tags} />;
};

const FooterWithPageParam = ({ items }: { items: Item[] }) => {
  const page = usePage(useParams());
  const filteredItems = useFilteredItems({ items });

  return <Footer pageName={page || ""} items={filteredItems} />;
};

export interface Data {
  items: Item[];
  releases: string[];
}

export default function App() {
  const { data, config } = useConfig();

  useEffect(() => {
    console.log("changed");
  }, [data, config]);

  const messages = useFetch<Messages>(
    `${publicUrl}messages.json?${process.env.REACT_APP_BUILDHASH}`
  );

  if (data && config) {
    const { items, releases } = data;
    return (
      <MessagesProvider messages={messages}>
        <BrowserRouter basename={`${publicUrl}`}>
          <Routes>
            <Route
              path={"/*"}
              element={
                <div>
                  <DrawerRight />
                  <div className="page">
                    <div className="page__header">
                      <HeaderWithPageParam items={items} />
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
