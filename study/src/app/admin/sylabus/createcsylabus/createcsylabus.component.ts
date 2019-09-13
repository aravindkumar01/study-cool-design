import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorInstance, EditorLocale, EditorOption } from 'angular-markdown-editor';
import { MarkdownService } from 'ngx-markdown';
import { first } from 'rxjs/operators';
import { Sylabus } from '../model/sylabus';
import { SylabusService } from '../service/sylabus.service';

export interface Unit {
  count: number;
}

@Component({
  selector: 'app-createcsylabus',
  templateUrl: './createcsylabus.component.html',
  styleUrls: ['./createcsylabus.component.css']
})
export class CreatecsylabusComponent implements OnInit {

  unit: Unit[] = [
    { count: 1 }, { count: 2 }, { count: 3 }, { count: 4 }, { count: 5 } ];

  unitControl = new FormControl('', [Validators.required]);

  sylabus_Id: number;
  subject_id: number;
  sylabus: Sylabus = new Sylabus();
  buttonName: string = "Create";
  bsEditorInstance: EditorInstance;
  markdownText: string;
  showEditor = true;
  templateForm: FormGroup;
  editorOptions: EditorOption;
  locale: EditorLocale = {
    language: 'fr',
    dictionary: {
      'Bold': 'Gras',
      'Italic': 'Italique',
      'Heading': 'Titre',
      'URL/Link': 'Insérer un lien HTTP',
      'Image': 'Insérer une image',
      'List': 'Liste à puces',
      'Ordered List': 'Liste ordonnée',
      'Unordered List': 'Liste non-ordonnée',
      'Code': 'Code',
      'Quote': 'Citation',
      'Preview': 'Prévisualiser',
      'Strikethrough': 'Caractères barrés',
      'Table': 'Table',
      'strong text': 'texte important',
      'emphasized text': 'texte souligné',
      'heading text': 'texte d\'entête',
      'enter link description here': 'entrez la description du lien ici',
      'Insert Hyperlink': 'Insérez le lien hypertexte',
      'enter image description here': 'entrez la description de l\'image ici',
      'Insert Image Hyperlink': 'Insérez le lien hypertexte de l\'image',
      'enter image title here': 'entrez le titre de l\'image ici',
      'list text here': 'texte à puce ici'
    }
  };

  constructor(
    private fb: FormBuilder,
    private markdownService: MarkdownService,
    private servcie: SylabusService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.subject_id = +localStorage.getItem("SubjectId");
    this.route.params.subscribe(params => {
      this.sylabus_Id = params['id'];
      this.subject_id = params['sid'];
    });

    if (this.sylabus_Id == 0) {
      this.newSylabus();
    }

    if (this.sylabus_Id != null && this.sylabus_Id > 0) {
      this.buttonName = "Update";
      this.editSylabus();
    }

  }

  newSylabus() {
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    // put the text completely on the left to avoid extra white spaces
    this.markdownText =
      `### Markdown example
---
This is an **example** where we bind a variable to the \`markdown\` component that is also bind to a textarea.
#### example.component.ts
\`\`\`javascript
function hello() {
  alert('Hello World');
}
\`\`\`
#### example.component.css
\`\`\`css
.bold {
  font-weight: bold;
}
\`\`\``;

    this.buildForm(this.markdownText);
  }


  editSylabus() {

    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    this.servcie.getSylabus(+this.sylabus_Id).pipe(first()).subscribe(sylabus => {
      this.sylabus = sylabus;
      this.markdownText = this.sylabus.content;
      this.buildForm(this.markdownText);
    });
  }




  buildForm(markdownText: any) {
    this.templateForm = this.fb.group({
      body: [markdownText],
      isPreview: [true]
    });
  }

  /** highlight all code found, needs to be wrapped in timer to work properly */
  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  hidePreview() {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  showFullScreen(isFullScreen: boolean) {
    if (this.bsEditorInstance && this.bsEditorInstance.setFullscreen) {
      this.bsEditorInstance.showPreview();
      this.bsEditorInstance.setFullscreen(isFullScreen);
    }
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());
    this.highlight();

    return markedOutput;
  }



  postValues() {

    this.sylabus.subject_id = this.subject_id;
    this.sylabus.content = this.markdownText;
    this.servcie.createSylabus(this.sylabus)
      .subscribe(data => {
        alert(data);
      }, error => {
        console.log(error);
        alert(error.error.text);

      }
      );
    this.sylabus = new Sylabus();

    this.router.navigate(['/admin/sylabus/' + this.subject_id]);

  }






}

