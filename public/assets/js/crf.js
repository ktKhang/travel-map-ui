jQuery(function($) {
  let fields = [
    {
      type: 'autocomplete',
      label: 'Custom Autocomplete',
      required: true,
      values: [
        {label: 'SQL'},
        {label: 'C#'},
        {label: 'JavaScript'},
        {label: 'Java'}
      ]
    },
    {
      label: 'Star Rating',
      attrs: {
        type: 'starRating'
      },
      icon: '🌟'
    }
  ];

  let replaceFields = [
    {
      type: 'textarea',
      subtype: 'tinymce',
      label: 'tinyMCE',
      required: true,
    }
  ];

  let actionButtons = [{
    id: 'smile',
    className: 'btn btn-success',
    label: '😁',
    type: 'button',
    events: {
      click: function() {
        alert('😁😁😁 !SMILE! 😁😁😁');
      }
    }
  }];

  let templates = {
    starRating: function(fieldData) {
      return {
        field: '<span id="'+fieldData.name+'">',
        onRender: function() {
          $(document.getElementById(fieldData.name)).rateYo({rating: 3.6});
        }
      };
    }
  };

  let crfBasicInformation = [{
        label: 'CRF Item Text',
        icon: '',
        name: 'user-details', // optional
        showHeader: false, // optional
        fields: [{
          type: 'crf_text',
          label: 'Item name',
          className: 'form-control',
          required: true,
          units: 'your units',
          display: true,
          phiData: false

        }/* ,{
          type: 'text',
          label: 'CRF Version',
          className: 'form-control'
        }*/
      ]
      }];
  

  let typeUserDisabledAttrs = {
    autocomplete: ['access'],
    crf_text: ['access', 'className', 'name']
  };

  let typeUserAttrs = {
    text: {
      className: {
        label: 'Class',
        options: {
          'red form-control': 'Red',
          'green form-control': 'Green',
          'blue form-control': 'Blue'
        },
        style: 'border: 1px solid red'
      }
    },// Luan add default values here
    crf_text: {
      className: {
        label: 'Css Class',
        value: 'form-control',
        style: 'border: 1px solid #c5c5c5'
      }
    },
  };

  // test disabledAttrs
  let disabledAttrs = ['placeholder'];

  let fbOptions = {
    subtypes: {
      text: ['datetime-local']
    },
    onSave: function(e, formData) {
      toggleEdit();
      $('.render-wrap').formRender({
        formData: formData,
        templates: templates
      });
      window.sessionStorage.setItem('formData', JSON.stringify(formData));
      
      
    },
    stickyControls: {
      enable: true
    },
    sortableControls: true,
    fields: fields,
    templates: templates,
    inputSets: crfBasicInformation,
    typeUserDisabledAttrs: typeUserDisabledAttrs,
    typeUserAttrs: typeUserAttrs,
    disableInjectedStyle: false,
    actionButtons: actionButtons,
    disableFields: ['autocomplete'],
    replaceFields: replaceFields,
    disabledFieldButtons: {
      text: ['copy']
      ,crfBasicInfor: ['copy']
    }
    // controlPosition: 'left'
    // disabledAttrs
  };
  let formData = window.sessionStorage.getItem('formData');
  let editing = true;

  if (formData) {
    fbOptions.formData = JSON.parse(formData);
  }

  /**
   * Toggles the edit mode for the demo
   * @return {Boolean} editMode
   */
  function toggleEdit() {
    document.body.classList.toggle('form-rendered', editing);
    return editing = !editing;
  }

  let setFormData = '[{"type":"text","label":"Full Name","subtype":"text","className":"form-control","name":"text-1476748004559"},{"type":"select","label":"Occupation","className":"form-control","name":"select-1476748006618","values":[{"label":"Street Sweeper","value":"option-1","selected":true},{"label":"Moth Man","value":"option-2"},{"label":"Chemist","value":"option-3"}]},{"type":"textarea","label":"Short Bio","rows":"5","className":"form-control","name":"textarea-1476748007461"}]';

  console.log('Form builder option ======= ');
  console.log(fbOptions);
  let formBuilder;
  if(document.getElementById('build-wrap-detail')){
    console.log('Yes');
    formBuilder = $('.build-wrap-detail').formBuilder(fbOptions);
  }else{
    console.log('No');
    formBuilder = $('.build-wrap').formBuilder(fbOptions);
  }
  let fbPromise = formBuilder.promise;

  fbPromise.then(function(fb) {
    let apiBtns;
    if(document.getElementById('build-wrap-detail')){
      apiBtns = {
        updateCrfData: fb.actions.updateCRF
      };
    }else{
      apiBtns = {
        saveCrfData: fb.actions.createCRF
      };
    }
    

    Object.keys(apiBtns).forEach(function(action) {
      let act = document.getElementById(action);
      if(act){
        act.addEventListener('click', function(e) {
          apiBtns[action]();
        });
      }
    });

    let language = document.getElementById('setLanguage');
    if(language){
        language.addEventListener('change', function(e) {
          fb.actions.setLang(e.target.value);
        });
    }
    

    /* document.getElementById('getXML').addEventListener('click', function() {
      alert(formBuilder.actions.getData('xml'));
    });
    document.getElementById('getJSON').addEventListener('click', function() {
      alert(formBuilder.actions.getData('json', true));
    });
    document.getElementById('getJS').addEventListener('click', function() {
      alert('check console');
      console.log(formBuilder.actions.getData());
    });
    */
  });

  let edit = document.getElementById('edit-form');
  if(edit){
    edit.onclick = function() {
      toggleEdit();
    };
  }
});
