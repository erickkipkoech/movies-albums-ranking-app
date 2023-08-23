namespace RankingApp.Models
{
    public class ItemModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ImageId { get; set; }
        public int Ranking { get; init; }
        public int ItemType { get; init; }
    }
}
