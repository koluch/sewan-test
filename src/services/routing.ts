export interface Route<Params> {
  defaultParams?: Params;
  path: string;
}

function route<Params = void>(path: string): Route<Params> {
  return { path };
}

export function makeUrl<Params>(
  route: Route<Params>,
  params: Params,
  query?: { [key: string]: string | number | boolean | null | undefined }
): string {
  let result = route.path
    .split("/")
    .filter((x) => x !== "")
    .map((part) => {
      if (part.startsWith(":")) {
        const paramName = part.substr(1);
        const paramKey = paramName as keyof Params;
        let paramValue = params[paramKey];

        if (
          (paramValue == null ||
            (typeof paramValue === "string" && paramValue == "")) &&
          route.defaultParams != null
        ) {
          paramValue = route.defaultParams[paramKey];
        }

        if (
          paramValue == null ||
          (typeof paramValue === "string" && paramValue == "")
        ) {
          throw new Error(`Parameter '${paramName}' is missing`);
        }
        return paramValue;
      }
      return part;
    })
    .join("/");

  if (query != null) {
    const queryStr = Object.entries(query)
      .filter(([__, value]) => value != null)
      .map(
        ([key, value]) =>
          `${key}=${encodeURIComponent(value != null ? value : "")}`
      )
      .join("&");
    if (queryStr != "") {
      result = `${result}?${queryStr}`;
    }
  }

  return `/${result}`;
}

export const ROUTES = {
  root: route("/"),
  episodeList: route("/"),
  character: route<{ id: string }>("/character/:id"),
};
