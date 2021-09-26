import EmfImage from "../images/emf.png";
import FingerprintImage from "../images/fingerprint.png";
import FreezingImage from "../images/freezing.png";
import OrbImage from "../images/orb.png";
import SpiritImage from "../images/spirit.png";
import WritingImage from "../images/writing.png";
import NoneImage from "../images/none.png";
import DotsImage from "../images/dots.png";

export function getEvidenceImage(key: string) {
  switch (key) {
    case "freezing":
      return FreezingImage;
    case "emf":
      return EmfImage;
    case "orb":
      return OrbImage;
    case "spirit":
      return SpiritImage;
    case "writing":
      return WritingImage;
    case "fingerprints":
      return FingerprintImage;
    case "dots":
      return DotsImage;
    default:
      return NoneImage;
  }
}

export function getEvidenceKeyAndImagePair(keys: string[]): [string, string][] {
  return keys.map((key) => [key, getEvidenceImage(key)]);
}
