<?php 
namespace App\Traits;
use Illuminate\Http\Request;
use App\User;
use App\carrera;
use App\uc;

trait ControllerComun {
	
	public function index(Request $req)
	{
		$data = $this->model::all();
		return view($this->view.".index");
	}

	public function items(Request $req)
	{
		$data = $this->model::where("id","LIKE",$req->q)->take($req->n)->get();
		return view($this->view.".items",compact("data"));
	}

	
    public function create()
    {
        return view($this->view.".create");
    }

   
    public function store(Request $req)
    {
        try {
            $req->validate($this->validate);
            $this->model::create($req->all());
            return view($this->view.".create")->with('msj', 'Creado correctamente!');
        } catch (\Exception $e) {
            return view($this->view.".create")->withErrors($e->getMessage());   
        }
    }

   
    public function show(Request $req)
    {
        //
    }

    
    public function edit(Request $req)
    {
        $data = $this->model::find($req->id);
        return view($this->view.".edit",compact("data"));
    }

    
    public function update(Request $req)
    {
        
        try {
            
            $req->validate($this->validate);
            $update = $this->model::find($req->id);
            $data = $update;
            $update->update($req->data);
        
            return view($this->view.".edit",compact("data"))->with('msj', '¡Actualizado correctamente!');
        } catch (\Exception $e) {
            return view($this->view.".edit",compact("data"))->withInput()->withErrors($e->getMessage());   
        }


    }

    
    public function destroy(Request $req)
    {
        try {
            
            $update = $this->model::find($req->id)->delete();
            return view("layouts.error",['msj' => '¡Eliminado correctamente!']);
        } catch (\Exception $e) {
            return view("layouts.error")->withErrors($e->getMessage());   
        }
    }
}	
