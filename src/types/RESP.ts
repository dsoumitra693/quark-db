export enum RESP {
    SIMPLE_STRING = "+",
    ERROR = "-",
    BULK_STRING = "$",
    INTEGER = ":",
    ARRAY = "*",
    NULL = "_",
    BOOLEAN = "#",
    DOUBLE = ",",
    BULK_ERROR = "!",
    MAP = "%",
    CRLF = "\r\n",
    NIL = "~",
    TRUE = "t",
    FALSE = "f",
  }