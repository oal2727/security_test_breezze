<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  Carbon\Carbon;
use App\Models\Pets;

class PetsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $path = public_path() . '/images/pets/';
        $image = $request->file('nameImage');
        $nameFile = $this->uploadFile($path,$image);
        $request->merge([
            'image'=>$nameFile
        ]);
        Pets::updateOrCreate([
            'id'=>$request->id,
        ],$request->all());
        return redirect("/dashboard");
    }

    public function getNumberOfActually(){
        return Carbon::now()->format('ymdhhmmssu');
    }

    public function uploadFile($path,$image){
        $nameFile = $this->getNumberOfActually() . '.' . $image->getClientOriginalExtension();
        $path = $path . $nameFile;
        if (move_uploaded_file($image, $path)) {
             $logoImg =  $nameFile;
        }
        return $logoImg;
   }

   public function joinMerge(Request $request,$logo){
    return $request->merge([
         'image'=>$logo,
    ]);
}
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
