/* @Libs */
import {
  type ParseOptions,
  type StringifyOptions,
  parse,
  stringify,
} from "query-string";

/* @Hooks */
import { type SetStateAction, useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const initialParseOptions: ParseOptions = {
  arrayFormat: "separator",
  arrayFormatSeparator: "|",
  parseBooleans: true,
  parseNumbers: true,
};

const initialStringifyOptions: StringifyOptions = {
  arrayFormat: "separator",
  arrayFormatSeparator: "|",
  skipEmptyString: true,
  skipNull: true,
};

type Options = {
  replace?: boolean;
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
};

type SearchParamState = Record<string, any>;

export function useSearchParamState<
  T extends SearchParamState = SearchParamState
>(initialState?: T | (() => T), options?: Options) {
  type State = Partial<T>;

  const { replace = true, parseOptions, stringifyOptions } = options || {};
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const initialStateRef = useRef<State>(
    typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState || {}
  );
  const state = useMemo(
    () => ({
      ...initialStateRef.current,
      ...(parse(location.search, {
        ...initialStringifyOptions,
        ...parseOptions,
      }) as State),
    }),
    [location.search, parseOptions]
  );

  function setSearchParamsState(s: SetStateAction<State>) {
    const newState = typeof s === "function" ? s(state) : s;

    const stringifyState = stringify(
      { ...state, ...newState },
      { ...initialParseOptions, ...stringifyOptions }
    );

    setSearchParams(stringifyState, { replace });
  }

  return [state, setSearchParamsState] as const;
}
