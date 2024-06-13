export function detectCollision(a, b) {
  return (
    a.position.x < b.position.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.position.x + a.width > b.position.x && //a's top right corner passes b's top left corner
    a.position.y < b.position.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.position.y + a.height > b.position.y
  );
}
