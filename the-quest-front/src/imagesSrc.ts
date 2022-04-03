export function getRoleSrc(role: string): string {
  switch (role) {
    case "Fighter":
      return require("./Assets/role_icon/fighter.png");
    case "Tank":
      return require("./Assets/role_icon/tank.png");
    case "Support":
      return require("./Assets/role_icon/support.png");
    case "Assassin":
      return require("./Assets/role_icon/assassin.png");
    case "Colossus":
      return require("./Assets/role_icon/colossus.png");
    case "Enchanteur":
      return require("./Assets/role_icon/enchanteur.png");
    case "Marksman":
      return require("./Assets/role_icon/marksman.png");
    case "Ninja":
      return require("./Assets/role_icon/ninja.png");
    default:
      return require("./Assets/role_icon/mage.png");
  }
}

export function getMasterySrc(lvl: number): string {
  switch (lvl) {
    case 7:
      return require("./Assets/mastery_icon/mastery7_icon.png");
    case 6:
      return require("./Assets/mastery_icon/mastery6_icon.png");
    case 5:
      return require("./Assets/mastery_icon/mastery5_icon.png");
    case 4:
      return require("./Assets/mastery_icon/mastery4_icon.png");
    case 3:
      return require("./Assets/mastery_icon/mastery3_icon.png");
    case 2:
      return require("./Assets/mastery_icon/mastery2_icon.png");
    default:
      return require("./Assets/mastery_icon/mastery1_icon.png");
  }
}

export function getTokenSrc(type: number): string {
  switch (type) {
    case 7:
      return require("./Assets/mastery7_token.png");
    case 6:
      return require("./Assets/mastery6_token.png");
    default:
      return "";
  }
}

export function chestSrc(): string {
  return require("./Assets/chest_icon.png");
}
