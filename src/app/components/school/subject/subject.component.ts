import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from '../../../services/subject.service';
import { Subjects } from '../../../models';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  displayedColumns = ['name', 'code', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private subjectService: SubjectService, private router: Router) { }



  ngOnInit() {

    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.ApiSubjectGet().subscribe( x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
    });
  }

  add() {
    this.router.navigate(['subject/add']);
  }

  edit(id: number) {
    this.router.navigate(['subject', id ]);
  }
  delete(id: number) {
    this.subjectService.ApiSubjectByIdDelete(id).subscribe(x => {
        this.loadSubjects();
    });
  }

}
