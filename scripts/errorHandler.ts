import { Quadrant, Ring } from "@/lib/types";

export enum ErrorType {
  NoQuadrant = "Item {0} has no quadrant or ring",
  InvalidQuadrant = "Item {0} has invalid quadrant {1}\n\tvalid quadrants are: {2}",
  InvalidRing = "Item {0} has invalid ring {1}\n\tvalid rings are: {2}",
  NoRadarItems = "No valid radar items found. Please check the markdown files in the `radar` directory.",
}

export enum TextColor {
  Default = 0,
  Black,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Mangenta = 35,
  Cyan = 36,
  White = 37,
}

export default class ErrorHandler {
  private buildErrors: string[] = [];
  private quadrants: Quadrant[];
  private rings: Ring[];
  private isStrict: boolean;
  private supportsColor: boolean;

  constructor(quadrants: Quadrant[], rings: Ring[]) {
    this.isStrict = process.argv.slice(2).includes("--strict");
    this.supportsColor = process.stdout.isTTY && process.env.TERM !== "dumb";
    this.quadrants = quadrants;
    this.rings = rings;
    console.log(`ℹ️ Build is${this.isStrict ? "" : " not"} in strict mode\n`);
  }

  public processBuildErrors(errorType: ErrorType, ...args: string[]) {
    const errorHint = this.getErrorHint(errorType);
    const errorMsg = this.formatString(
      errorType.toString(),
      errorHint ? [...args, errorHint] : args,
    );
    this.buildErrors.push(errorMsg);
  }

  public checkForBuildErrors(exitOnErr: boolean = false) {
    if (this.buildErrors.length > 0) {
      console.warn(
        this.colorizeBackground(
          `There ${this.buildErrors.length > 1 ? "are" : "is"} ${this.buildErrors.length} error${this.buildErrors.length > 1 ? "s" : ""} in your data build`,
          TextColor.Red,
        ) +
          "\n\n" +
          this.buildErrors
            .map((error, index) => `${index + 1}. ${error}`)
            .join("\n") +
          "\n",
      );

      if (this.isStrict || exitOnErr) {
        process.exit(1);
      }

      this.buildErrors = [];
    }
  }

  private getErrorHint(errorType: ErrorType) {
    switch (errorType) {
      case ErrorType.InvalidQuadrant:
        return this.quadrants.map((quadrant) => quadrant.id).join(", ");
      case ErrorType.InvalidRing:
        return this.rings.map((ring) => ring.id).join(", ");
      default:
        break;
    }
  }

  public colorizeBackground(str: string, backgroundColor: TextColor) {
    if (this.supportsColor) {
      return `\x1b[${backgroundColor + 10}m${str}\x1b[${TextColor.Default}m`;
    }

    return str;
  }

  private formatString(msg: string, inserts: string[]) {
    return inserts.reduce(
      (acc, cur, index) =>
        acc.replaceAll(
          `{${index}}`,
          this.colorizeString(
            cur,
            index === 2 ? TextColor.Green : TextColor.Red,
          ),
        ),
      msg,
    );
  }

  private colorizeString(str: string, textColor: TextColor) {
    if (this.supportsColor) {
      return `\x1b[${textColor}m${str}\x1b[${TextColor.Default}m`;
    }

    return str;
  }
}
