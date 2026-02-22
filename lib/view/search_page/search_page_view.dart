import 'package:flutter/material.dart';
import 'package:barbearia/view/search_page/widgets/past_search.dart';
import 'package:barbearia/view/search_page/widgets/recent_search.dart';
import 'package:barbearia/view/search_page/widgets/search_textfield.dart';

class SearchPageView extends StatefulWidget {
  const SearchPageView({Key? key}) : super(key: key);

  @override
  _SearchPageViewState createState() => _SearchPageViewState();
}

class _SearchPageViewState extends State<SearchPageView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        centerTitle: true,
        title : const Text("Search", style: TextStyle(color: Colors.white),),
        elevation: 0,
        backgroundColor: Colors.black,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Column(
        children: [
          SearchTextField(hint_text: "Search"),
          const RecentSearch(),
          PastSearch(search_text: "Grillled Chicken"),
          PastSearch(search_text: "Organic Orange"),
        ],
      ),
    );
  }
}
