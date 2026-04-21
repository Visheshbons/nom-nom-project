// ---------- IMPORTS ---------- \\
import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";

// ---------- CONSTANTS ---------- \\
const app = express();
const port = 3000;

// ---------- MIDDLEWARE ---------- \\
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// ---------- ROUTES ---------- \\
const ejsFilePaths = {
  "/": "home",
  "/copyright": "copyright",
  "/origins": "origins",
  "/about": "about",
};

app.use((req, res) => {
  let view = ejsFilePaths[req.path];

  if (!view) {
    view = "error";
  }

  res.render("index", {
    page: view,
    err: {
      code: 404,
      literal: "ERR_404_PAGE_NOT_FOUND",
      message: "The page you requested was not found.",
    },
  });
});

function errorHandler(err, req, res, next) {
  console.error(err && err.stack ? err.stack : err);
  try {
    addLog(err || "Error: unknown");
  } catch (e) {
    // take up sim racing as a hobby
  }

  let literal = "";
  let message = "";
  switch (err.status) {
    case 500: {
      literal = "ERR_500_INTERNAL_SERVER_ERROR";
      message = "A unknown error has occured!";
      break;
    }
    case 501: {
      literal = "ERR_501_NOT_IMPLEMENTED";
      message = "This feature is not available yet!";
      break;
    }
    case 502: {
      literal = "ERR_502_BAD_GATEWAY";
      message =
        "The server was acting as a gateway or proxy and received an invalid response from the upstream server!";
      break;
    }
    case 503: {
      literal = "ERR_503_SERVICE_UNAVAILABLE";
      message = "The server is currently unavailable (overloaded or down)!";
      break;
    }
    case 504: {
      literal = "ERR_504_GATEWAY_TIMEOUT";
      message =
        "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server!";
      break;
    }
    case 505: {
      literal = "ERR_505_HTTP_VERSION_NOT_SUPPORTED";
      message =
        "The server does not support the HTTP protocol version used in the request!";
      break;
    }
    case 506: {
      literal = "ERR_506_VARIANT_ALSO_NEGOTIATES";
      message =
        "The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process!";
      break;
    }
    case 507: {
      literal = "ERR_507_INSUFFICIENT_STORAGE";
      message =
        "The server is unable to store the representation needed to compe the request!";
      break;
    }
    case 508: {
      literal = "ERR_508_LOOP_DETECTED";
      message =
        "The server detected an infinite loop while processing the request!";
      break;
    }
    case 509: {
      literal = "ERR_509_BANDWIDTH_LIMIT_EXCEEDED";
      message =
        "The server has exceeded the bandwidth specified by the server administrator!";
      break;
    }
    case 510: {
      literal = "ERR_510_NOT_EXTENDED";
      message =
        "Further extensions to the request are required for the server to fulfill it!";
      break;
    }
    case 511: {
      literal = "ERR_511_NETWORK_AUTHENTICATION_REQUIRED";
      message = "The client needs to authenticate to gain network access!";
      break;
    }
    default: {
      literal = "ERR_500_INTERNAL_SERVER_ERROR_UNKNOWN";
      message = "A critical error has occured!";
      break;
    }
  }

  res.status(err.status || 500).render("err.ejs", {
    err: {
      code: err.status || 500,
      literal: literal,
      message: message,
    },
  });
}
app.use(errorHandler);

// ---------- SERVER INIT ---------- \\
app.listen(port, () => {
  console.log(`Server running on port ${chalk.green(port)}.`);
});
