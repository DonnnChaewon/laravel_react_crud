<?php

namespace App\Http\Controllers;

use App\Http\Requests\TopicStoreRequest;
use App\Models\Topic;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TopicController extends Controller {
    public function index() {
        $topics = Topic::all();
        
        return response()->json([
            'topics' => $topics
        ], 200);
    }

    public function store(TopicStoreRequest $request) {
        try {
            $data = $request->validated();
            $imageFile = $request->file('image');
            $imageName = Str::random(32).".".$request->file('image')->getClientOriginalExtension();
            
            Topic::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'image' => $imageName
            ]);

            // Save image in storage folder
            Storage::disk('public')->put($imageName, file_get_contents($imageFile));

            return response()->json([
                'message' => 'Success to create topic!'
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'Fail to create topic!'
            ], 500);
        }
    }

    public function show($id) {
        $topic = Topic::find($id);
        if(!$topic) {
            return response()->json([
                'message' => 'Topic not found!'
            ], 404);
        }

        return response()->json([
            'topic' => $topic
        ], 200);
    }

    public function update(TopicStoreRequest $request, $id) {
        try {
            $data = $request->validated();
            $topic = Topic::find($id);
            if(!$topic) {
                return response()->json([
                    'message' => 'Topic not found.'
                ], 404);
            }

            $topic->title = $data['title'];
            $topic->description = $data['description'];

            if($request->hasFile('image')) {
                // Public storage
                $storage = Storage::disk('public');

                // Delete old image
                if($storage->exists($topic->image)) $storage->delete($topic->image);

                // Image name
                $imageFile = $request->file('image');
                $imageName = Str::random(32).".".$request->file('image')->getClientOriginalExtension();
                $topic->image = $imageName;

                // Save image in public folder
                $storage->put($imageName, file_get_contents($imageFile));
            }

            $topic->save();

            return response()->json([
                'message' => 'Success to update topic!'
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'Fail to update topic!'
            ], 500);
        }
    }

    public function destroy($id) {
        $topic = Topic::find($id);
        if(!$topic) {
            return response()->json([
                'message' => 'Topic not found.'
            ], 404);
        }

        $storage = Storage::disk('public');

        if($storage->exists($topic->image)) $storage->delete($topic->image);

        $topic->delete();

        return response()->json([
            'message' => 'Success to delete topic!'
        ], 200);
    }
}