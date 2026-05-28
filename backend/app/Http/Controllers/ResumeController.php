<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resume = Resume::first();

        if (!$resume) {
            return response()->json(null);
        }

        return response()->json([
            'id' => $resume->id,
            'title' => $resume->title,
            'file_url' => asset('storage/' . $resume->file_path),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'resume' => 'required|mimes:pdf|max:2048'
        ]);

        $path = $request->file('resume')->store('resume', 'public');

        return Resume::create([
            'title' => $request->title,
            'file_path' => $path
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Resume::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $resume = Resume::findOrFail($id);

        $request->validate([
            'title' => 'required',
            'resume' => 'nullable|mimes:pdf|max:2048'
        ]);

        if ($request->hasFile('resume')) {
            $path = $request->file('resume')->store('resume', 'public');
            $resume->file_path = $path;
        }

        $resume->title = $request->title;
        $resume->save();

        return $resume;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $resume = Resume::findOrFail($id);

        $resume->delete();

        return response()->json([
            'message' => 'Resume deleted successfully'
        ]);
    }
}
