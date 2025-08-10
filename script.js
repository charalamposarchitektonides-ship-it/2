let personIdCounter = 1;

// Initial root person
let rootPerson = {
  id: personIdCounter++,
  name: "Me",
  parents: [],
  children: []
};

function renderPerson(person) {
  const container = document.createElement("div");
  container.className = "person";

  const nameElem = document.createElement("strong");
  nameElem.textContent = person.name;
  container.appendChild(nameElem);

  const addParentBtn = document.createElement("button");
  addParentBtn.textContent = "Add Parent";
  addParentBtn.onclick = () => {
    const name = prompt("Enter parent's name:");
    if (name) {
      const parent = { id: personIdCounter++, name, parents: [], children: [person] };
      person.parents.push(parent);
      renderTree();
    }
  };
  container.appendChild(document.createElement("br"));
  container.appendChild(addParentBtn);

  const addChildBtn = document.createElement("button");
  addChildBtn.textContent = "Add Child";
  addChildBtn.onclick = () => {
    const name = prompt("Enter child's name:");
    if (name) {
      const child = { id: personIdCounter++, name, parents: [person], children: [] };
      person.children.push(child);
      renderTree();
    }
  };
  container.appendChild(addChildBtn);

  // Render children
  if (person.children.length > 0) {
    const childrenContainer = document.createElement("div");
    childrenContainer.className = "children";
    person.children.forEach(child => {
      childrenContainer.appendChild(renderPerson(child));
    });
    container.appendChild(childrenContainer);
  }

  return container;
}

function renderTree() {
  const treeDiv = document.getElementById("tree");
  treeDiv.innerHTML = "";
  treeDiv.appendChild(renderPerson(rootPerson));
}

// Initial render
renderTree();