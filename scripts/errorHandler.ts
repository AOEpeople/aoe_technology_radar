import { Ring, Segment } from "@/lib/types";

export enum ErrorType {
  InvalidSegmentConfig = "Please setup 2-6 segments in the config.json - you configured {0}.",
  NoSegmentOrRing = "Item {0} has no segment or ring",
  InvalidSegment = "Item {0} has invalid segment {1}\n\tvalid segments are: {2}",
  InvalidRing = "Item {0} has invalid ring {1}\n\tvalid rings are: {2}",
  NoRadarItems = "No valid radar items found. Please check the markdown files in the `radar` directory.",
  DeprecatedQuadrantAttribute = "Item {0} is using deprecated 'quadrant' attribute. Please use 'segment' instead.",
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
  private segments: Segment[];
  private rings: Ring[];
  private isStrict: boolean;
  private supportsColor: boolean;

  constructor(segments: Segment[], rings: Ring[]) {
    this.isStrict = process.argv.slice(2).includes("--strict");
    this.supportsColor = process.stdout.isTTY && process.env.TERM !== "dumb";
    this.segments = segments;
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
      case ErrorType.InvalidSegment:
        return this.segments.map((segment) => segment.id).join(", ");
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
