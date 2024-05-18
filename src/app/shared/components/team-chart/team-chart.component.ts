import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OrganizationChartModule} from "primeng/organizationchart";
import {TreeNode} from "primeng/api";

export interface Child {
  label: string;
}

export interface Parent {
  label: string;
  expanded: boolean;
  children?: Child[];
}

@Component({
  selector: 'app-team-chart',
  standalone: true,
  imports: [
    OrganizationChartModule
  ],
  templateUrl: './team-chart.component.html',
  styleUrl: './team-chart.component.scss'
})
export class TeamChartComponent implements OnInit, OnChanges {

  @Input({required: true}) team: any;

  data: TreeNode[] = [];

  parent: Parent[] = [];
  children: Child[] = [];

  ngOnInit(): void {
    this.team = this.teamWithoutSubstitute;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.team = this.teamWithoutSubstitute;
    this.data = this.generateChart();
  }

  private generateChart() {
    const keys = Object.keys(this.team);
    const nbParents = keys.length / 2;
    this.parent = this.generateParent(nbParents);
    this.children = this.generateChild(keys);

    this.parent.forEach((parent: Parent) => {
      for (let i = 0; i < 2; i++) {
        parent.children!.push(this.getRandomChild());
      }
    })

    if (keys.length === 4 || keys.length === 3) {
      this.parent = [
        {
          label: 'MATCH FINAL',
          expanded: true,
          children: this.parent
        }
      ]
    }

    return this.parent;
  }

  private generateParent(nbParents: number) {

    let parents: Parent[] = [];
    for (let i = 0; i < nbParents; i++) {
      parents.push({
        label: `MATCH ${i + 1}`,
        expanded: true,
        children: []
      })
    }
    return parents;
  }

  private generateChild(keys: string[]): Child[] {
    let children: Child[] = [];
    keys.forEach((key: string) => {
      children.push({
        label: key,
      })
    })
    return children;

  }

  private getRandomChild() {
    // Générer un index aléatoire
    let randomIndex = Math.floor(Math.random() * this.children.length);
    // Récupérer l'élément à cet index
    let randomElement = this.children[randomIndex];
    // Supprimer l'élément du tableau
    this.children.splice(randomIndex, 1);
    return randomElement;
  }

  private get teamWithoutSubstitute() {
    const {substitute, ...teamWithoutSubstitute} = this.team;
    return teamWithoutSubstitute;
  }
}
