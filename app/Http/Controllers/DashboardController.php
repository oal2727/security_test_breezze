<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  Carbon\Carbon;
use App\Models\Pets;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pets = Pets::all();
        collect($pets)->map(function($row){
            $row->imageUrl = "/images/pets/".$row->image;
            return $row;
        });
        return Inertia::render('Dashboard',[
            "pets"=>$pets
        ]);
    }

    

    
}
