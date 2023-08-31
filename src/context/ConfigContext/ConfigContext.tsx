import React, { createContext, useContext, useEffect, useState } from "react";

import { Data } from "../../components/App";
import { ConfigData, publicUrl } from "../../config";
import { isCustomMode } from "../../config";
import { Item } from "../../model";

type ConfigContextType = {
  config: ConfigData | null;
  data: Data | null;
  customMode: boolean;
  updateConfigContext: (config: ConfigData | null) => void;
  resetConfigContext: () => void;
  addItemToData: (item: Item | null) => void;
  updateDataContext: (data: Data | null) => void;
  emptyDataContext: () => void;
  resetDataContext: () => void;
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [customMode, setCustomMode] = useState(isCustomMode);

  const defaultConfigPath = `${publicUrl}config.json?${process.env.REACT_APP_BUILDHASH}`;
  const customConfigPath = `${publicUrl}newConfig.json?${process.env.REACT_APP_BUILDHASH}`;
  const defaultDataPath = `${publicUrl}rd.json?${process.env.REACT_APP_BUILDHASH}`;
  const customDataPath = `${publicUrl}newRd.json?${process.env.REACT_APP_BUILDHASH}`;

  const fetchData = async <D extends unknown>(
    url: string
  ): Promise<D | null> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`fetch ${url} failed. Did the file exist?`);
      }
      const data: D = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const dataToJsonString = () => {
    const newData = JSON.stringify(data);
    console.log(newData);
  };

  async function setFirstConfig() {
    let configPath: string;
    let dataPath: string;

    if (customMode) {
      setCustomMode(true);
      configPath = `${publicUrl}newConfig.json?${process.env.REACT_APP_BUILDHASH}`;
      dataPath = `${publicUrl}newRd.json?${process.env.REACT_APP_BUILDHASH}`;
    } else {
      setCustomMode(false);
      configPath = `${publicUrl}config.json?${process.env.REACT_APP_BUILDHASH}`;
      dataPath = `${publicUrl}Rd.json?${process.env.REACT_APP_BUILDHASH}`;
    }

    const newConfig = await fetchData<ConfigData>(configPath);
    if (newConfig != null) {
      setConfig(newConfig);
    }

    const newData = await fetchData<Data>(dataPath);
    if (newData != null) {
      setData(newData);
    }
  }

  const resetConfigContext = async () => {
    const defaultConfig = await fetchData<ConfigData>(defaultConfigPath);
    setConfig(defaultConfig);
    dataToJsonString();
  };

  const updateDataContext = (data: Data | null) => {
    setData(data);
  };

  const updateConfigContext = (newConfig: ConfigData | null) => {
    if (newConfig) {
      setConfig(newConfig);
      console.log(newConfig);
    }
  };

  const emptyDataContext = () => {
    setData(null);
  };

  const resetDataContext = async () => {
    const defaultData = await fetchData<Data>(defaultDataPath);
    setData(defaultData);
  };

  const addItemToData = (newItem: Item | null) => {
    if (data) {
      const newData = { ...data };
      newData.items = [...newData.items, newItem as Item];
      setData(newData);
    }
  };

  useEffect(() => {
    setFirstConfig();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        config: config,
        data: data,
        customMode: customMode,
        updateConfigContext: updateConfigContext,
        resetConfigContext: resetConfigContext,
        addItemToData: addItemToData,
        updateDataContext: updateDataContext,
        emptyDataContext: emptyDataContext,
        resetDataContext: resetDataContext,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
